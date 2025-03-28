import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { SiweMessage } from "siwe";

import type { DUser } from "@/types/api";
import { Resp } from "@/types/api";

import { databaseConnection } from "../../common/database";
import * as graphql from "../../common/graphql";
import { snowflake } from "../../common/toolkit";

import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
      return NextResponse.json(
        Resp.err("please contact admin about login issue, missing key"),
        { status: 400 }
      );
    }

    const { message, signature } = await request.json();

    let fields;
    try {
      const siweMessage = new SiweMessage(message);
      fields = await siweMessage.verify({ signature });

      // fields = { data: { nonce: "3456789235", address: "0x2376628375284594" } };
    } catch (err) {
      console.warn("err", err);
      return NextResponse.json(Resp.err("invalid message"), { status: 400 });
    }

    const address = fields.data.address.toLowerCase();
    const token = await new SignJWT({ address })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(jwtSecretKey));

    const sql = databaseConnection();
    const [storedUser] =
      await sql`select * from d_user where address = ${address} limit 1`;
    if (!storedUser) {
      const contributor = await graphql.inspectContributor(address);
      let power = "0";
      if (contributor) {
        power = contributor.power;
      }
      const hexPower = `0x${BigInt(power).toString(16).padStart(64, "0")}`;

      const newUser: DUser = {
        id: snowflake.generate(),
        address,
        power: hexPower,
        last_login_time: new Date().toISOString(),
      };
      await sql`insert into d_user ${sql(
        newUser,
        "id",
        "address",
        "last_login_time",
        "power"
      )}`;
    } else {
      storedUser.last_login_time = new Date().toISOString();
      await sql`
        update d_user set 
        last_login_time=${storedUser.last_login_time}, 
        utime=${storedUser.last_login_time} 
        where id=${storedUser.id};
      `;
    }
    return NextResponse.json(Resp.ok({ token }));
  } catch (err) {
    console.warn("err", err);
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json(Resp.errWithData("logion failed", message), {
      status: 400,
    });
  }
}

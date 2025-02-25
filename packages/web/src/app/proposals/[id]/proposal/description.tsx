export const Description = () => {
  return (
    <div className="prose">
      <section>
        <h2>Abstract</h2>
        <p>
          This constitutional AIP proposes upgrading both Arbitrum One and
          Arbitrum Nova to use a new dispute resolution protocol, called
          Arbitrum BoLD, and the addition of Infura to Arbitrum Nova&apos;s
          validator whitelist. Specifically, this AIP combines the following two
          temperature check votes:
        </p>
      </section>

      <section>
        <h2>BoLD - permissionless validation for Arbitrum</h2>
        <p>
          This proposal requests the ArbitrumDAO to approve the upgrade of
          Arbitrum One and Arbitrum Nova to utilize Arbitrum BoLD: a new dispute
          resolution protocol that is designed to replace the currently deployed
          dispute resolution protocol. If this upgrade is approved, validators
          on Arbitrum One and Arbitrum Nova can use Arbitrum Nitro software to
          post assertions and to challenge invalid assertions. Note validation
          will be permissionless on Arbitrum One but remain permissioned on
          Arbitrum Nova (also elaborated on further down in this proposal).
        </p>
      </section>

      <section>
        <h2>Motivation</h2>
        <p>
          The ArbitrumDAO should consider approving this AIP because both the
          adoption of Arbitrum BoLD and the whitelisting of Infura&apos;s
          Arbitrum Nova validator will enhance the network&apos;s security,
          stability, and resiliency. Both of these proposed changes will benefit
          all Arbitrum users, Arbitrum node operators, dApps on Arbitrum, and
          Arbitrum bridges.
        </p>
        <p>
          Specifically, passing this governance proposal would mean that
          Arbitrum One and Arbitrum Nova will gain the following benefits:
        </p>
      </section>
    </div>
  );
};

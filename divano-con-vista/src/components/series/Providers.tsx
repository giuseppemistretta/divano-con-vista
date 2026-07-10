import type { Provider } from "../../types/provider";

type Props = {
  providers?: Provider[];
};

export default function Providers({ providers = [] }: Props) {
  if (!providers.length) return null;

  return (
    <section className="providersSection">
      <h2>Dove guardarla</h2>

      <div className="providersRow">
        {providers.map((provider) => (
          <div className="providerCard" key={provider.id}>
            {provider.logo && <img src={provider.logo} alt={provider.name} />}
            <span>{provider.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
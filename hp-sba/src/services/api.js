//API for Elixirs Here

export const fetchElixirs = async () => {
  const response = await fetch(
    `https://wizard-world-api.herokuapp.com/Elixirs`
  );
  if (!response.ok) {
    throw new Error("Access Denied Your No Wizard!");
  }
  const elixirs = await response.json();
  return elixirs.map((elixir) => ({
    id: elixir.id,
    name: elixir.name,
    effect: elixir.effect,
    ingredients: elixir.ingredients,
  }));
};

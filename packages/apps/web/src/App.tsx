import { Button } from "@grasdouble/lufa_design-system";

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <Button label={"Click me"} />
      <br />
      <Button label={"Click me"} variant="dashed" size="large" />
    </div>
  );
}

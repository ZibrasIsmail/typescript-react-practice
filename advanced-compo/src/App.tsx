import { useRef } from "react";
import Button from "./components/Button";
import Form, { type FormHandleProps } from "./components/Form";
import Input from "./components/Input";

function App() {
  const customForm = useRef<FormHandleProps>(null);

  function handleSave(data: unknown) {
    const extractedData = data as { name: string; age: number };
    console.log(extractedData);
    customForm.current?.clear();
  }

  return (
    <main>
      <Form onSave={handleSave} ref={customForm}>
        <Input id="name" label="Name" type="text" />
        <Input id="age" label="Age" type="number" />
        <p>
          <Button>Submit</Button>
        </p>
      </Form>
    </main>
  );
}

export default App;

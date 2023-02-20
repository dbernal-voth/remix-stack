import type { ObjectSchema } from "joi";

type SchemaExtended = ObjectSchema & {
  _ids: {
    _byKey: Map<string, { schema: { type: string } }>;
  };
};

export async function getFormData<T>(
  request: Request,
  schema: ObjectSchema
): Promise<[string, null] | [null, T]> {
  const parsedSchema = schema as SchemaExtended;
  const formData = await request.formData();

  const values: { [x: string]: string | number } = {};

  for (const schemaValue of parsedSchema._ids._byKey) {
    const name = schemaValue[0];
    const type = schemaValue[1].schema.type;
    let tmpValue: string | number = formData.get(name) as string;
    if (type === "number") {
      tmpValue = parseFloat(tmpValue);
    }
    values[name] = tmpValue;
  }

  const hasError = schema.validate(values);
  if (hasError.error) {
    return [hasError.error.message, null];
  }
  return [null, values as T];
}

import { useTransition } from "@remix-run/react";
import { FileInput, Label } from "flowbite-react";
import PrimaryButton from "~/components/PrimaryButton";
import Loader from "~/components/Loader";

const ExcelFileInput = () => {
  const transition = useTransition();
  return (
    <>
      {!!transition.submission && <Loader />}
      <div id="fileUpload" className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="file">Seleccionar archivo</Label>
        </div>
        <FileInput
          id="file"
          name="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          helperText="Selecciona el archivo excel y verifica que esté llenado correctamente"
          disabled={!!transition.submission}
        />
      </div>
      <PrimaryButton type="submit" size="sm" disabled={!!transition.submission}>
        {transition.submission ? "Subiendo archivo..." : "Subir archivo"}
      </PrimaryButton>
    </>
  );
};

export default ExcelFileInput;

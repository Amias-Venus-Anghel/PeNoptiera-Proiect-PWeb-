import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useIntl } from "react-intl";
import { useProductAddDialogController } from "./ProductAddDialog.controller";
import { ProductAddForm } from "@presentation/components/forms/Product/ProductAddForm";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const ProductAddDialog = () => {
  const { open, close, isOpen } = useProductAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      {formatMessage({ id: "labels.addProduct" })}
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.addProduct" })}
      </DialogTitle>
      <DialogContent>
        <ProductAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};
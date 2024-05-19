import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useIntl } from "react-intl";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useProductUpdateDialogController } from "./ProductUpdateDialog.controller";
import { ProductUpdateForm } from "@presentation/components/forms/Product/ProductUpdateForm";
import { ProductDTO } from "@infrastructure/apis/client";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const ProductUpdateDialog = ({ product }: { product: ProductDTO }) => {
  const { open, close, isOpen } = useProductUpdateDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <IconButton color='info' onClick={open}>
      <NoteAddIcon color='info' fontSize='small' />
    </IconButton>

    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.update" })}
      </DialogTitle>
      <DialogContent>
        <ProductUpdateForm product={product} onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};
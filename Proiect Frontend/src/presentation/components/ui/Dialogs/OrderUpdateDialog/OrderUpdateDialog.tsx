import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useOrderUpdateDialogController } from "./OrderUpdateDialog.controller";
import { useIntl } from "react-intl";
import { OrderUpdateForm } from "@presentation/components/forms/Order/OrderUpdateForm";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

/**
 * This component wraps the user add form into a modal dialog.
 */
export const OrderUpdateDialog = ({ orderId }: { orderId: string }) => {
  const { open, close, isOpen } = useOrderUpdateDialogController();
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
        <OrderUpdateForm orderId={orderId} onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useIntl } from "react-intl";
import { useConfirmDelDialogController } from "./ConfirmDelDialog.controller";
import { ConfirmDelForm } from "@presentation/components/forms/ConfirmDelete/ConfirmDeleteForm";

import DeleteIcon from '@mui/icons-material/Delete';

/**
 * This component wraps the user add form into a modal dialog.
 */
export const ConfirmDelDialog = ({ onConfirm }: { onConfirm: () => void }) => { 
  const { open, close, isOpen } = useConfirmDelDialogController();
  const { formatMessage } = useIntl();

  const handleConfirm = () => {
    onConfirm(); // Call the callback function passed as prop
    close(); // Close the dialog
  };

  return <div>
    <IconButton color="error" onClick={() => open()}>
      <DeleteIcon color="error" fontSize='small' />
    </IconButton>

    <Dialog
      open={isOpen}
      onClose={() => close()}>

      <DialogTitle>
        {formatMessage({ id: "globals.confirm" })}
      </DialogTitle>
      <DialogContent>
        <ConfirmDelForm onSubmit={() => handleConfirm()} />
      </DialogContent>
    </Dialog>
  </div>
};
import { logError } from '@metamask/snaps-utils';
import type { FunctionComponent } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

import { useInvokeMutation } from '../../../api';
import { Result, Snap } from '../../../components';
import { getSnapId } from '../../../utils';
import { DIALOGS_SNAP_ID, DIALOGS_SNAP_PORT } from './constants';

export const Dialogs: FunctionComponent = () => {
  const [invokeSnap, { isLoading, data }] = useInvokeMutation();
  const snapId = getSnapId(DIALOGS_SNAP_ID, DIALOGS_SNAP_PORT);

  const handleSubmitAlert = () => {
    invokeSnap({
      snapId,
      method: 'showAlert',
    }).catch(logError);
  };

  const handleSubmitConfirmation = () => {
    invokeSnap({
      snapId,
      method: 'showConfirmation',
    }).catch(logError);
  };

  const handleSubmitPrompt = () => {
    invokeSnap({
      snapId,
      method: 'showPrompt',
    }).catch(logError);
  };

  return (
    <Snap
      name="Dialogs Snap"
      snapId={DIALOGS_SNAP_ID}
      port={DIALOGS_SNAP_PORT}
      testId="dialogs"
    >
      <ButtonGroup className="mb-3">
        <Button
          id="sendAlertButton"
          onClick={handleSubmitAlert}
          disabled={isLoading}
        >
          Alert
        </Button>
        <Button
          id="sendConfirmationButton"
          onClick={handleSubmitConfirmation}
          disabled={isLoading}
        >
          Confirmation
        </Button>
        <Button
          id="sendPromptButton"
          onClick={handleSubmitPrompt}
          disabled={isLoading}
        >
          Prompt
        </Button>
      </ButtonGroup>

      <Result>
        <span id="dialogResult">{JSON.stringify(data, null, 2)}</span>
      </Result>
    </Snap>
  );
};

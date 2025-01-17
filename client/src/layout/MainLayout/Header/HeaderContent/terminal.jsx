import React, { useEffect } from "react";
import { BorderOuterOutlined, ClockCircleOutlined, ConsoleSqlOutlined, MonitorOutlined, WindowsOutlined } from "@ant-design/icons";
import { Badge, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from "@mui/material";
import TerminalComponent from "../../../../components/terminal";

import * as API from '../../../../api';
import { useTranslation } from "react-i18next";
import { useClientInfos } from "../../../../utils/hooks";

const TerminalHeader = () => {
	const [open, setOpen] = React.useState(false);
	const [status, setStatus] = React.useState(false);
  const { t, Trans } = useTranslation();
	const {role} = useClientInfos();
	const isAdmin = role === "2";

	useEffect(() => {
    API.getStatus().then((res) => {
      setStatus(res.data);
    });
	}, []);

	const onopen = () => {
			setOpen((prevOpen) => !prevOpen);
	};

	return isAdmin ? (<>
		<Tooltip title={t('mgmt.servapps.containers.terminal.enabled')}>
			<IconButton
					disableRipple
					color="secondary"
					sx={{ color: 'text.primary' }}
					aria-label="open profile"
					aria-haspopup="true"
					onClick={onopen}
			>
					<BorderOuterOutlined />
			</IconButton>
		</Tooltip>
		
		<Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth={true}>
			<DialogTitle>{t('mgmt.servapps.containers.terminal.enabled')}</DialogTitle>
			<DialogContent>
          {(!status || !status.containerized) ? <DialogContentText>
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
							<TerminalComponent refresh={() => {}} connectButtons={
								[
									{
										label: t('global.connect'),
										onClick: (connect) => connect(() => API.terminal(), 'Server Terminal')
									},
								]} />
						</div>
					</DialogContentText> : <DialogContentText>
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
							<MonitorOutlined style={{fontSize: 100, color: 'red'}} />
							<h3>{t('mgmt.servapps.containers.terminal.disabled')}</h3>
						</div>
					</DialogContentText>}
        </DialogContent>
        <DialogActions>
            <Button onClick={() => {
              setOpen(false)
            }}>Close</Button>
        </DialogActions>
		</Dialog>
		</>) : null
}

export default TerminalHeader;
import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { deleteUser } from '../services/userService'
import { deleteBook } from '../services/booksService';
import { deleteFutureBook } from '../services/futureService';

const PopconfirmBO = ({ id, type }) => {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);

        setTimeout(async () => {
            setOpen(false);
            setConfirmLoading(false);

            if (type === "user") {
                await deleteUser({ id: id })
            } else if (type === "book") {
                await deleteBook({ id: id })
            } else if (type === "future") {
                await deleteFutureBook({ id: id })
            } else {
                throw new Error('Delete button need a type')
            }

        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Popconfirm
            title="Êtes vous sûr ?"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
        >
            <Button type="primary" onClick={showPopconfirm}>
                Supprimer
            </Button>
        </Popconfirm>
    );

};

export default PopconfirmBO;
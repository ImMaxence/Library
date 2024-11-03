import { React, useState } from 'react';
import { Button } from 'antd'
import { updateBook } from '../services/booksService';
import { updateFutureBook } from '../services/futureService';
import { updateUser } from '../services/userService';

const UpdateBO = ({ id, type, username, password, role, title, author, price, date, passwordChanged, image }) => {

    const [loading, setLoading] = useState(false);

    const handleUpdate = () => {

        setLoading(true)

        setTimeout(async () => {
            if (type === "user") {
                setLoading(false)
                await updateUser({ id: id, username: username, password: password, role: role, passwordChanged: passwordChanged, image: image })
            } else if (type === "book") {
                setLoading(false)
                await updateBook({ id: id, title: title, author: author, price: price })
            } else if (type === "future") {
                setLoading(false)
                await updateFutureBook({ id: id, title: title, author: author, date: date })
            } else {
                setLoading(false)
                throw new Error('Update button need a type')
            }
        }, 2000)
    }

    return (
        <Button loading={loading} onClick={handleUpdate}>Modifier</Button>
    );
};

export default UpdateBO;
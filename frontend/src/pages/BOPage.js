import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Skeleton, Button, Input, FloatButton } from 'antd';
import { getAllUser } from '../services/userService';
import { getAllBooks, addBook } from '../services/booksService';
import { getAllFutureBooks, createFutureBook } from '../services/futureService';
import PopconfirmBO from '../components/PopconfirmBO';
import UpdateBO from '../components/UpdateBO';
import { register } from '../services/authService';
import { SyncOutlined } from '@ant-design/icons';

const { Search } = Input;

const BOPage = () => {
    const [users, setUsers] = useState(null);
    const [books, setBooks] = useState(null);
    const [futureBooks, setFutureBooks] = useState(null);

    const [errorUser, setErrorUser] = useState('');
    const [errorBook, setErrorBook] = useState('');
    const [errorFuture, setErrorFuture] = useState('');

    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [loadingFutureBooks, setLoadingFutureBooks] = useState(true);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filteredFutureBooks, setFilteredFutureBooks] = useState([]);

    const [loadingRe, setLoadingRe] = useState(false);
    const [usernameRe, setUsernameRe] = useState('');
    const [passwordRe, setPasswordRe] = useState('');
    const [errorRe, setErrorRe] = useState('');

    const [loadingCreateBook, setLoadingCreateBook] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [price, setPrice] = useState('')
    const [errorCreateBook, setErrorCreateBook] = useState('')

    const [loadingCreateFu, setLoadingCreateFu] = useState(false)
    const [titleFu, setTitleFu] = useState('')
    const [authorFu, setAuthorFu] = useState('')
    const [date, setDate] = useState('')
    const [errorCreateFu, setErrorCreateFu] = useState('')

    const [userImages, setUserImages] = useState({}); // local
    const [userFiles, setUserFiles] = useState({});

    const [bookImages, setBookImages] = useState({}); // local
    const [bookFiles, setBookFiles] = useState({});

    const [futureImages, setFutureImages] = useState({}); // local
    const [futurFiles, setFutureFiles] = useState({});

    const [fileCreateBook, setFileCreateBook] = useState({})
    const [fileCreateFuture, setFileCreateFuture] = useState({})

    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const getContent = await getAllUser();
                setUsers(getContent);
                setFilteredUsers(getContent);
                console.log(getContent)
            } catch (err) {
                setErrorUser(err.message);
            } finally {
                setLoadingUsers(false);
            }
        };

        const fetchBook = async () => {
            try {
                const getContent = await getAllBooks();
                setBooks(getContent);
                setFilteredBooks(getContent);
            } catch (err) {
                setErrorBook(err.message);
            } finally {
                setLoadingBooks(false);
            }
        };

        const fetchFuture = async () => {
            try {
                const getContent = await getAllFutureBooks();
                setFutureBooks(getContent);
                setFilteredFutureBooks(getContent);
            } catch (err) {
                setErrorFuture(err.message);
            } finally {
                setLoadingFutureBooks(false);
            }
        };

        setTimeout(fetchUser, 1000);
        setTimeout(fetchBook, 2000);
        setTimeout(fetchFuture, 3000);
        setTrigger(false)
    }, [trigger]);

    const onSearchUser = (value, type) => {
        if (users && users.length > 0) {
            const lowercasedValue = value.toLowerCase();
            const filtered = users.filter(user =>
                user[type].toLowerCase().includes(lowercasedValue)
            );
            setFilteredUsers(filtered);
        }
    };

    const onSearchBook = (value, type) => {
        if (books && books.length > 0) {
            const lowercasedValue = value.toLowerCase();
            const filtered = books.filter(book =>
                book[type].toLowerCase().includes(lowercasedValue)
            );
            setFilteredBooks(filtered);
        }
    };

    const onSearchFutureBook = (value, type) => {
        if (futureBooks && futureBooks.length > 0) {
            const lowercasedValue = value.toLowerCase();
            const filtered = futureBooks.filter(book =>
                book[type].toLowerCase().includes(lowercasedValue)
            );
            setFilteredFutureBooks(filtered);
        }
    };

    const onChangeUserField = (id, field, value) => {
        setFilteredUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === id
                    ? { ...user, [field]: value, passwordChanged: field === 'password' ? true : user.passwordChanged }
                    : user
            )
        );
    };

    const onChangeBookField = (id, field, value) => {
        setFilteredBooks(prevBooks =>
            prevBooks.map(book =>
                book.id === id ? { ...book, [field]: value } : book
            )
        );
    };

    const onChangeFutureBookField = (id, field, value) => {
        setFilteredFutureBooks(prevFutureBooks =>
            prevFutureBooks.map(book =>
                book.id === id ? { ...book, [field]: value } : book
            )
        );
    };

    const handleSubmitRe = async (e) => {
        e.preventDefault();

        setLoadingRe(true);
        setErrorRe('')

        setTimeout(async () => {
            if (usernameRe.length <= 0 || passwordRe.length <= 0) {
                setErrorRe('Veuillez rentrer un nom et mot de passe');
                setLoadingRe(false);
            } else {
                try {
                    await register({ username: usernameRe, password: passwordRe });
                    setErrorRe('Création avec succès');
                    setLoadingRe(false);
                } catch (err) {
                    setErrorRe('Erreur technique lors de la création du compte');
                    console.log(err);
                    setLoadingRe(false);
                }
            }
        }, 2000)
    };

    const handleSubmitCreateBook = async (e) => {
        e.preventDefault();

        setLoadingCreateBook(true);
        setErrorCreateBook('')

        setTimeout(async () => {
            if (title.length <= 0 || author.length <= 0 || price.length <= 0 || fileCreateBook <= 0) {
                setErrorCreateBook('Veuillez rentrer tous les champs');
                setLoadingCreateBook(false);
            } else {
                try {
                    await addBook({ title: title, author: author, price: price, image: fileCreateBook });
                    setErrorCreateBook('Création avec succès');
                    setLoadingCreateBook(false);
                } catch (err) {
                    setErrorCreateBook('Erreur technique lors de la création');
                    console.log(err);
                    setLoadingCreateBook(false);
                }
            }
        }, 2000)
    };

    const handleSubmitCreateFu = async (e) => {
        e.preventDefault();

        setLoadingCreateFu(true);
        setErrorCreateFu('')

        setTimeout(async () => {
            if (titleFu.length <= 0 || authorFu.length <= 0 || date.length <= 0 || fileCreateFuture <= 0) {
                setErrorCreateBook('Veuillez rentrer tous les champs');
                setLoadingCreateFu(false);
            } else {
                try {
                    await createFutureBook({ title: titleFu, author: authorFu, date: date, image: fileCreateFuture });
                    setErrorCreateFu('Création avec succès');
                    setLoadingCreateFu(false);
                } catch (err) {
                    setErrorCreateFu('Erreur technique lors de la création');
                    console.log(err);
                    setLoadingCreateFu(false);
                }
            }
        }, 2000)
    };

    const handleFileChangeUser = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            setUserFiles(file);
            const fileURL = URL.createObjectURL(file);
            setUserImages(prevImages => ({ ...prevImages, [id]: fileURL }));
        }
    };

    const handleFileChangeBook = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            setBookFiles(file);
            const fileURL = URL.createObjectURL(file);
            setBookImages(prevImages => ({ ...prevImages, [id]: fileURL }));
        }
    };

    const handleFileChangeFuture = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            setFutureFiles(file);
            const fileURL = URL.createObjectURL(file);
            setFutureImages(prevImages => ({ ...prevImages, [id]: fileURL }));
        }
    };

    return (
        <Layout>
            <div className='bo_container'>
                <h1>Back Office</h1>
                <Button type='dashed' onClick={() => setTrigger(true)}>Refresh 🔄</Button>
                <FloatButton
                    icon={<SyncOutlined />}
                    type="primary"

                    onClick={() => setTrigger(true)}
                />

                <section>
                    <h3 className='title'>Users manage</h3>
                    <h4 className='title'>Create user</h4>
                    <form onSubmit={handleSubmitRe}>
                        {errorRe && <p className='error'>{errorRe}</p>}
                        <p>USERNAME</p>
                        <Input type='text' onChange={(e) => setUsernameRe(e.target.value)} />
                        <p>PASSWORD</p>
                        <Input type='password' onChange={(e) => setPasswordRe(e.target.value)} />
                        <Button type="primary" loading={loadingRe} htmlType="submit">CREATE</Button>
                    </form>
                    <h4 className='title'>Update - Delete user</h4>
                    <Search
                        placeholder="Username"
                        onSearch={(value) => onSearchUser(value, 'username')}
                        enterButton
                        style={{ width: 304 }}
                    />
                    {loadingUsers ? (
                        <Skeleton active />
                    ) : errorUser ? (
                        <p className='error'>{errorUser}</p>
                    ) : filteredUsers && filteredUsers.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USERNAME</th>
                                    <th>ROLE</th>
                                    <th>MDP</th>
                                    <th>IMAGE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td><input type="text" value={item.username} onChange={(e) => onChangeUserField(item.id, 'username', e.target.value)} /></td>
                                        <td><input type="number" max={2} min={1} value={item.role} onChange={(e) => onChangeUserField(item.id, 'role', e.target.value)} /></td>
                                        <td><input type="password" value={item.password} onChange={(e) => onChangeUserField(item.id, 'password', e.target.value)} /></td>
                                        <td>
                                            {userImages[item.id] ? (
                                                <img src={userImages[item.id]} alt="Profile Preview" style={{ width: 100, height: 100 }} />
                                            ) : (
                                                <img src={item.image} alt="Profile" style={{ width: 100, height: 100 }} />
                                            )}
                                            <input type="file" accept="image/*" onChange={(e) => handleFileChangeUser(item.id, e)} />
                                        </td>
                                        <td>
                                            <UpdateBO id={item.id} type="user" username={item.username} role={item.role} password={item.password} passwordChanged={item.passwordChanged || false} image={userFiles} />
                                            <PopconfirmBO id={item.id} type="user" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No data</p>
                    )}
                </section>

                <section>
                    <h3 className='title'>Books manage</h3>
                    <h4 className='title'>Create book</h4>
                    <form onSubmit={handleSubmitCreateBook}>
                        {errorCreateBook && <p className='error'>{errorCreateBook}</p>}
                        <p>TITLE</p>
                        <Input type='text' onChange={(e) => setTitle(e.target.value)} />
                        <p>AUTHOR</p>
                        <Input type='text' onChange={(e) => setAuthor(e.target.value)} />
                        <p>PRICE</p>
                        <Input type='number' onChange={(e) => setPrice(e.target.value)} />
                        <p>IMAGE</p>
                        <Input type='file' accept="image/*" onChange={(e) => setFileCreateBook(e.target.files[0])} />
                        <Button type="primary" loading={loadingCreateBook} htmlType="submit">Create</Button>
                    </form>
                    <Search
                        placeholder="Title"
                        onSearch={(value) => onSearchBook(value, 'title')}
                        enterButton
                        style={{ width: 304 }}
                    />
                    {loadingBooks ? (
                        <Skeleton active />
                    ) : errorBook ? (
                        <p className='error'>{errorBook}</p>
                    ) : filteredBooks && filteredBooks.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>TITLE</th>
                                    <th>AUTHOR</th>
                                    <th>PRICE</th>
                                    <th>IMAGE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td><input type="text" value={item.title} onChange={(e) => onChangeBookField(item.id, 'title', e.target.value)} /></td>
                                        <td><input type="text" value={item.author} onChange={(e) => onChangeBookField(item.id, 'author', e.target.value)} /></td>
                                        <td><input type="number" value={item.price} onChange={(e) => onChangeBookField(item.id, 'price', e.target.value)} /></td>
                                        <td>
                                            {bookImages[item.id] ? (
                                                <img src={bookImages[item.id]} alt="Preview" style={{ width: 100, height: 100 }} />
                                            ) : (
                                                <img src={item.image} alt="img" style={{ width: 100, height: 100 }} />
                                            )}
                                            <input type="file" accept="image/*" onChange={(e) => handleFileChangeBook(item.id, e)} />
                                        </td>
                                        <td>
                                            <UpdateBO id={item.id} type="book" title={item.title} author={item.author} price={item.price} image={bookFiles} />
                                            <PopconfirmBO id={item.id} type="book" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No data</p>
                    )}
                </section>

                <section>
                    <h3 className='title'>Manage future</h3>
                    <h4 className='title'>Create future</h4>
                    <form onSubmit={handleSubmitCreateFu}>
                        {errorCreateFu && <p className='error'>{errorCreateFu}</p>}
                        <p>TITLE</p>
                        <Input type='text' onChange={(e) => setTitleFu(e.target.value)} />
                        <p>AUTHOR</p>
                        <Input type='text' onChange={(e) => setAuthorFu(e.target.value)} />
                        <p>DATE</p>
                        <Input type='date' onChange={(e) => setDate(e.target.value)} />
                        <p>IMAGE</p>
                        <Input type='file' accept="image/*" onChange={(e) => setFileCreateFuture(e.target.files[0])} />
                        <Button type="primary" loading={loadingCreateFu} htmlType="submit">Create</Button>
                    </form>
                    <Search
                        placeholder="Title"
                        onSearch={(value) => onSearchFutureBook(value, 'title')}
                        enterButton
                        style={{ width: 304 }}
                    />
                    {loadingFutureBooks ? (
                        <Skeleton active />
                    ) : errorFuture ? (
                        <p className='error'>{errorFuture}</p>
                    ) : filteredFutureBooks && filteredFutureBooks.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>TITLE</th>
                                    <th>AUTHOR</th>
                                    <th>DATE</th>
                                    <th>IMAGE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFutureBooks.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td><input type="text" value={item.title} onChange={(e) => onChangeFutureBookField(item.id, 'title', e.target.value)} /></td>
                                        <td><input type="text" value={item.author} onChange={(e) => onChangeFutureBookField(item.id, 'author', e.target.value)} /></td>
                                        <td><input type="date" value={new Date(item.date).toISOString().slice(0, 10)} onChange={(e) => onChangeFutureBookField(item.id, 'date', e.target.value)} /></td>
                                        <td>
                                            {futureImages[item.id] ? (
                                                <img src={futureImages[item.id]} alt="Preview" style={{ width: 100, height: 100 }} />
                                            ) : (
                                                <img src={item.image} alt="img" style={{ width: 100, height: 100 }} />
                                            )}
                                            <input type="file" accept="image/*" onChange={(e) => handleFileChangeFuture(item.id, e)} />
                                        </td>
                                        <td>
                                            <UpdateBO id={item.id} type="future" title={item.title} author={item.author} date={item.date} image={futurFiles} />
                                            <PopconfirmBO id={item.id} type="future" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No data</p>
                    )}
                </section>
            </div>
        </Layout>
    );
};

export default BOPage;

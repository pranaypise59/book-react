import React, { useEffect, useState } from 'react'
import BookDataService from '../Services/book.service'
const Books = () => {
    const [books, setBooks] = useState([])
    const [backups, setBackups] = useState([])
    const [message, setMessage] = useState({ error: false, msg: "" })



    const editHandler = async (book, author, url, id) => {
        setMessage("");
        const UpdatedBook = { book, author, url, copied: true }

        try {
            await BookDataService.updateBook(id, UpdatedBook);
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }
    };



    const handleCopy = async (book, author, url, id) => {
        editHandler(book, author, url, id)
        setMessage("")
        const newBackup = {
            book,
            author,
            url
        }
        // console.log(newBackup);

        try {
            await BookDataService.addBackup(newBackup)
            setMessage({ error: false, msg: "Book Copied Successfully" })
        } catch (err) {
            setMessage({ error: true, msg: err.message })
        }
        // setCopied(true)
    }



    const getBooks = async () => {
        const data = await BookDataService.getAllBooks();
        // console.log(data.docs)
        // setBooks(data.docs.map((doc) => {...docs.data(), id: doc.id }))
        setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const getBackups = async () => {
        const data = await BookDataService.getBackupBooks();
        // console.log(data.docs)
        // setBooks(data.docs.map((doc) => {...docs.data(), id: doc.id }))
        setBackups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(() => {
        getBooks()
        getBackups()
    }, [])
    return (
        <div className='container'>
            {message?.msg && <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>{message?.msg}</strong>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => { setMessage("") }}
                />
            </div>}

            <h2>Books</h2>
            <table className="table books">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">Author</th>
                        <th scope="col">Download</th>
                        <th scope="col">Copy</th>

                    </tr>
                </thead>
                <tbody className="table-group-divider my-5">
                    {books.map(({ book, author, url, copied, id }, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{book}</td>
                            <td>{author}</td>
                            <td><a href={url} download >Download</a></td>
                            {copied ? <td><button type="button" className="btn btn-primary" disabled >Already copied</button></td> : <td><button type="button" className="btn btn-primary" onClick={() => { handleCopy(book, author, url, id) }}>Copy to Backup</button></td>}
                        </tr>
                    ))}
                </tbody>
            </table>



            <h2>Backups</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">Author</th>
                        <th scope="col">Download</th>

                    </tr>
                </thead>
                <tbody className="table-group-divider my-5">
                    {backups.map(({ book, author, url, copied, id }, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{book}</td>
                            <td>{author}</td>
                            <td><a href={url} download >Download</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Books
import React from "react";
import {useEffect, useState} from "react";
import {Tabs} from "./components/Tabs";
import {Content} from "./components/Content";
import {useLocation} from "react-router-dom";
import {
    apiUrl,
    firstButtonStatus,
    firstTab, items,
    secondButtonStatus,
    secondTab,
    thirdButtonStatus,
    thirdTab
} from "./consts";
import styled from "styled-components";

const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  margin: 20px;
  border: 1px black solid;
`

const App = () => {

    const [currentTab, setCurrentTab] = useState(items[0].index);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tags = query?.get('tags');
    const tagsArr = tags ? tags.split(',') : [];

    const filterData = (books) => {
        return books.filter((item) => tagsArr.every(element => item.tags.includes(element)));
    }

    const getData = () => {
        fetch(apiUrl)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Книги не получены!");
                }
                return response.json()
            })
            .then(data => {
                setBooks(data.items.map(item => ({
                    ...item,
                    status: firstTab
                })));
                setFilteredBooks(filterData(data.items.map(item => ({
                    ...item,
                    status: firstTab
                }))));
            })
            .catch(err => {
                console.log(err.toString());
            })
    }

    const updateStatus = (id, newStatus) => {
        let allBooks = books;
        allBooks = allBooks.map(item => {
            if (item.id === id) {
                item.status = newStatus;
            }
            return item
        })
        setFilteredBooks(allBooks)
    }

    const defineAction = () => {
        if (currentTab === firstTab) {
            return [secondTab, firstButtonStatus, firstTab]
        } else if (currentTab === secondTab) {
            return [thirdTab, secondButtonStatus, secondTab]
        } else if (currentTab === thirdTab) {
            return [firstTab, thirdButtonStatus, thirdTab]
        }
    }

    useEffect(() => {
        setFilteredBooks(filterData(books))
    }, [tags])

    useEffect(() => {
        const savedData = localStorage.getItem("books");
        setBooks(JSON.parse(savedData));
    }, []);

    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books))
    }, [books]);

    useEffect(() => {
        getData();
    }, []);


    return (
        <AppStyled>
            <Tabs
                onChange={setCurrentTab}
                currentTab={currentTab}
                books={books}
                defineAction={defineAction}
            />
            <Content
                books={filteredBooks}
                updateStatus={updateStatus}
                defineAction={defineAction}
            />
        </AppStyled>
    );
}

export default App;

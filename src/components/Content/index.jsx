import React from "react";
import styled from "styled-components";
import {Filters} from "../Filters";
import {ListItem} from "../ListItem";
import {EmptyList} from "../EmptyList";

const ContentStyled = styled.div`
  min-height: 70vh;
`;


export const Content = ({books, updateStatus, defineAction}) => {
    const [, , status] = defineAction();

    return (
        <ContentStyled>
            <Filters/>
            {
                books?.map((bookItem, index) => (
                    bookItem.status === status &&
                    <ListItem
                        key={index}
                        bookItem={bookItem}
                        updateStatus={updateStatus}
                        defineAction={defineAction}
                    />
                ))
            }
            <EmptyList
                books={books}
                defineAction={defineAction}
            />
        </ContentStyled>
    )
}
import React from "react";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import {TagsStyled} from "../../consts";

const ItemStyled = styled.div`
  border: 1px black solid;
  padding: 30px;
`;

const ItemHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonStyled = styled.button`
  outline: 0;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: gray;
    color: #FFFFFF;
    transition: all .1s linear;
  }
`;

export const ListItem = ({bookItem, updateStatus, defineAction}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tags = query?.get('tags');
    const tab = query?.get('tab');
    const tagsToArray = tags?.split(",");
    const [action, nameOfAction] = defineAction();


    const pushTags = (e) => {
        const selectedTag = e.target.dataset.value;
        const condition = !tagsToArray?.includes(selectedTag);
        const newTags = condition ? [...(tags  ? tagsToArray : []), selectedTag] : tagsToArray;
        navigate(`${location.pathname}?tab=${tab}&tags=${newTags?.join(',')}`);
    };

    return (
        <>
            <ItemStyled>
                <ItemHeaderStyled>
                    <span>{bookItem.author}</span>
                    <ButtonStyled
                        onClick={() => updateStatus(bookItem.id, action)}
                    >
                        {nameOfAction}
                    </ButtonStyled>
                </ItemHeaderStyled>
                <h2>
                    {bookItem.title}
                </h2>
                <section>
                    {bookItem.description}
                </section>
                {
                    bookItem.tags.map((tags, index) => (
                        <TagsStyled
                            key={index}
                            onClick={(e) => pushTags(e)}
                            data-value={tags}
                        >
                            #{tags}
                        </TagsStyled>
                    ))
                }
            </ItemStyled>
        </>
    )
}
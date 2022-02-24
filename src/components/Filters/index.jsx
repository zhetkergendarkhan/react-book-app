import React from "react";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import {TagsStyled} from "../../consts";

const FiltersContainerStyled = styled.div`
  margin: 20px 0;
  padding: 5px;
`;

const ClearButtonStyled = styled.button`
  outline: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  &:after {
    display: block;
    content: "";
    width: 100%;
    height: 1px;
    background: black;
    margin-top: 1px;
  }

`;

export const Filters = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tags = query?.get('tags');
    const tab = query?.get('tab');
    const tagsToArray = tags?.split(',')

    const resetFilter = () => {
        navigate(`${location.pathname}?tab=${tab}`);
    }

    return (
        <FiltersContainerStyled>
            {
                tags &&
                <div>Filtered by tags:
                    {
                        tagsToArray.map((tagItem, index) =>
                            <TagsStyled key={index}>
                                #{tagItem}
                            </TagsStyled>
                        )
                    }
                    <ClearButtonStyled onClick={resetFilter}>
                        (Clear)
                    </ClearButtonStyled>
                </div>
            }
        </FiltersContainerStyled>
    )
};
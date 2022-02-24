import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {firstTab, items, secondTab, thirdTab} from "../../consts";


const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Tab = styled.button`
  ${({active}) => `
  display: block;
  font-size: 19px;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: transform 0.5s;
  
    ${
          active
                  ? `font-weight: bold;`
                  : `color: "#BCBCBC";`
  }
    `}
`;

export const Tabs = ({onChange, currentTab, books}) => {

    const navigate = useNavigate();
    const handleClick = (index) => () => {
        onChange(index)
        navigate(`/?tab=${index}`)

    };
    return (
        <TabsContainer>
            {
                items.map((item) => (
                    <Tab
                        key={item.index}
                        onClick={handleClick(item.index)}
                        active={currentTab === item.index}
                    >
                        {item.label}
                        {
                            item.index === firstTab
                                ?
                                <span>({books.filter(f => f.status === "ToRead").length})</span>
                                : item.index === secondTab
                                    ?
                                    <span>({books.filter(f => f.status === "InProgress").length})</span>
                                    : item.index === thirdTab
                                    &&
                                    <span>({books.filter(f => f.status === "Done").length})</span>
                        }
                    </Tab>
                ))}
        </TabsContainer>
    );
};
import styled from "styled-components";

export const firstTab = "ToRead";
export const secondTab = "InProgress";
export const thirdTab = "Done";

export const firstButtonStatus = "start reading";
export const secondButtonStatus = "finish reading";
export const thirdButtonStatus = "reading again";

export const items = [
    {
        label: 'To Read',
        index: 'ToRead'
    },
    {
        label: 'In Progress',
        index: 'InProgress'
    },
    {
        label: 'Done',
        index: 'Done'
    },
];

export const apiUrl = "https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json";

export const TagsStyled = styled.button`
  margin-right: 10px;
  padding: 2px;
  background: darkgray;
  cursor: pointer;
  outline: 0;
  border: 0;
  min-width: 60px;
`;



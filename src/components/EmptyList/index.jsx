import React from "react";


export const EmptyList = ({books, defineAction}) => {

    const [, , isEmpty] = defineAction();
    const emptyListOfBooks = books.filter(f => f.status === isEmpty).length === 0

    return (
        <>
            {
                emptyListOfBooks &&
                <div style={{textAlign: "center"}}>
                    List is empty!
                </div>
            }
        </>
    )
}
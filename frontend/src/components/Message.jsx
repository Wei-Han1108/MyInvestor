import { Alert } from "flowbite-react";

const Message = ({ boolean, message }) => {
    return (  
        <Alert color={boolean ? "success" : "danger"}>{message}</Alert>
    ) 
};

export default Message;
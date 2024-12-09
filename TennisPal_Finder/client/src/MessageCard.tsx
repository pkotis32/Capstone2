import {Card, CardBody, CardText} from 'reactstrap'
import './MessageCard.css'


interface MessageInfo {
  messageId: number,
  senderId: number,
  receiverId: number, 
  messageText: string,
  sentAt: string
}

interface MessageCardProps {
  message: MessageInfo,
  senderId: number,
}



// shows the individual message in the chat area
const MessageCard = ({message, senderId}: MessageCardProps) => {
  return (
    <div className={`${senderId == message.senderId ? "sender" : "receiver"}`}>
      <Card className="message-container">
        <CardBody className="message">
            <CardText>
              <span>{message.messageText}</span>
            </CardText>
        </CardBody>
          <span className="time">{message.sentAt}</span>
      </Card>
    </div>  
  )
}

export default MessageCard

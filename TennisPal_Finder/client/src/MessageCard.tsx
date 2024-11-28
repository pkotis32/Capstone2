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
  receiverId: number
}




const MessageCard = ({message, senderId, receiverId}: MessageCardProps) => {
  return (
    <div className={`${senderId == message.senderId ? "sender" : "receiver"} messageCard`}>
      <Card className="user-card">
        <CardBody>
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

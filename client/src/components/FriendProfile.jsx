// import React from 'react'
// import styled from '@emotion/styled';
// import {Card, CardHeader, Avatar, IconButton} from '@mui/material';

// function FriendProfile(props) {
//   const { name, title, status } = props
  
//   return (
//       <Card sx={{ maxWidth: 345 }} style={{margin:'4%', width:'100%'}}>
//         <CardHeader
//           avatar={
//             <Avatar sx={{ bgcolor: "#004477" }} aria-label="recipe">
//               {name[0]}
//             </Avatar>
//           }
//           action={
//             <IconButton aria-label="settings">
//               <div>{status}</div>
//             </IconButton>
//           }
//           title={name}
//           subheader={title}
//         />
//       </Card>
//   )
// }

// export default FriendProfile

import React from 'react'
import styled from '@emotion/styled';
import { Card, CardHeader, Avatar } from '@mui/material';

const StyledCard = styled(Card)`
  margin: 4%;
  width: 100%;
  color: ${(props) => (props.status === "offline" ? "#666" : "inherit")};
`;

// const StyledAvatar = styled(Avatar)`
//   background-color: ${(props) => (props.status === "offline" ? "#666" : "#004477")};
// `;

const StyledAvatar = styled(Avatar)`
  background-color: ${(props) => {
    const firstChar = props.name[0];
    const status = props.status;
    const colorValue = firstChar.charCodeAt(0) % 7; // 使用字符的Unicode值对7取模来生成颜色值
    const hue = 40 + 20 * colorValue; // 将颜色值映射到40到120之间
    if (status == "offline") {
      return "#666"
    }
    else {
      return `hsl(${hue}, 70%, 50%)`; // 使用HSL颜色模型，保证颜色不太暗或太亮
    }
  }};
`;

const StyledStatus = styled.div`
  color: ${(props) => (props.status === "offline" ? "#666" : "#00aa00")};
  font-size: 1rem;
  align-items: center;
  font-style: italic;
`;

const StyledTitle = styled.div`
  font-size: 1.5em; 
`;

function FriendProfile(props) {
  const { name, title, status } = props;

  return (
    <StyledCard status={status} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <StyledAvatar status={status} name={name} aria-label="recipe">
            {name[0]}
          </StyledAvatar>
        }
        action={
          <StyledStatus status={status}>
            {status}
          </StyledStatus>
        }
        title={<StyledTitle>{name}</StyledTitle>}
        subheader={title}
      />
    </StyledCard>
  )
}

export default FriendProfile
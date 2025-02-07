import * as React from "react";
import styled from "styled-components";

const UserImg = styled.img`
padding: 0px;
border-radius: 28px;
margin-right: 10px;
width: 35px;
`;

interface IProperties {
    leyenda: string;
  }

  const Info = (props: IProperties) => {
 
    const photoUrl = "https://dlsynapsewhoknowswhompro.blob.core.windows.net/resources/NoRelationshipLogo.png";

    
    return (
      <div className="box">
          <div>
            <UserImg src={photoUrl} alt=""></UserImg>
          </div>
          <div className="other">
            <span className="clientInfo">Emos sido engañados</span>
          </div>
        </div>
    );
  };
  
  export default Info;


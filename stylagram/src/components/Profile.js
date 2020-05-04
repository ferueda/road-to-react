import React from 'react';
import styled from 'styled-components';

import SingleImage from './Image.js';

const feedsource = [
  {
    source: 'https://picsum.photos/200',
    likes: '43',
    comments: '3',
    isVideo: false,
    id: 0,
  },
  {
    source: 'https://picsum.photos/201',
    likes: '313',
    comments: '10',
    isVideo: true,
    id: 1,
  },
  {
    source: 'https://picsum.photos/202',
    likes: '29',
    comments: '2',
    isVideo: false,
    id: 2,
  },
  {
    source: 'https://picsum.photos/203',
    likes: '18',
    comments: '2',
    isVideo: false,
    id: 3,
  },
  {
    source: 'https://picsum.photos/204',
    likes: '30',
    comments: '4',
    isVideo: false,
    id: 4,
  },
];

const ProfileContainer = styled.div`
  max-width: 1010px;
  width: 100%;
  margin: 20px auto;
`;

const ProfileDetails = styled.div`
  display: flex;
`;

const ProfileDetailsLeft = styled.div`
  margin-left: 40px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileDetailsRight = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  flex-direction: column;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  border: 1px solid #ccc;
  padding: 5px;
`;

const ProfileDetailsUsername = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditProfileButton = styled.div`
  background-color: transparent;
  border: 1px solid #dbdbdb;
  color: #262626;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 600;
  padding: 5px 9px;
  text-transform: capitalize;
  font-size: 14px;
  margin-left: 20px;
`;

const ProfileDetailsMeta = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileDetailsName = styled.div`
  text-align: left;
`;

const ParagraphText = styled.p`
  margin-right: 25px;
`;

const ImageWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileDetails>
        <ProfileDetailsLeft>
          <ProfileImage src='https://api.adorable.io/avatars/285/abott@adorable.png' />
        </ProfileDetailsLeft>

        <ProfileDetailsRight>
          <ProfileDetailsUsername>
            <h3>fruedal</h3>
            <EditProfileButton>Edit profile</EditProfileButton>
          </ProfileDetailsUsername>

          <ProfileDetailsMeta>
            <ParagraphText>
              <strong>5</strong> posts
            </ParagraphText>
            <ParagraphText>
              <strong>7.234</strong> followers
            </ParagraphText>
            <ParagraphText>
              <strong>269</strong> following
            </ParagraphText>
          </ProfileDetailsMeta>

          <ProfileDetailsName>
            <ParagraphText>
              <strong>Felipe Rueda</strong>
            </ParagraphText>
          </ProfileDetailsName>
        </ProfileDetailsRight>
      </ProfileDetails>

      <ImageWrapper>
        {feedsource.map((item) => (
          <SingleImage image={item} key={item.id} />
        ))}
      </ImageWrapper>
    </ProfileContainer>
  );
};

export default Profile;

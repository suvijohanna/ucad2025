const mediaItems = [
  {
    media_id: 9592,
    filename: 'f504.jpg',
    filesize: 48975,
    title: 'Desert',
    description: '',
    user_id: 3609,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:59:05.000Z',
  },
  {
    media_id: 9593,
    filename: '60ac.jpg',
    filesize: 23829,
    title: 'Basement',
    description: 'Light setup in basement',
    user_id: 305,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:56:41.000Z',
  },
];

const listAllMedia = () => {
  return mediaItems;
};

const findMediaById = (id) => {
  return mediaItems.find((item) => item.media_id == id);
};

const addMedia = (media) => {
  const {filename, title, description, user_id} = media;
  const newId = mediaItems[0].media_id + 1;
  mediaItems.unshift({media_id: newId, filename, title, description, user_id});
};

export {listAllMedia, findMediaById, addMedia};

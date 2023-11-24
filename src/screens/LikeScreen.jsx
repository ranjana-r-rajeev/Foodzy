// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const LikeScreen = () => {
//   return (
//     <View>
//       <Text>LikeScreen</Text>
//     </View>
//   )
// }

// export default LikeScreen

// const styles = StyleSheet.create({})
// import React from 'react';
// import { View, Text, Image } from 'react-native';

// const LikeScreen = ({ route }) => {
//   const { post } = route.params;

//   return (
//     <View>
//       <Text>Title: {post.title}</Text>
//       <Text>Location: {post.location}</Text>
//       {/* Display other details as needed */}
//       <Image source={{ uri: post.imageUrl }} style={{ width: 200, height: 200 }} />
//     </View>
//   );
// };

// export default LikeScreen;
import React from 'react';
import { View, Text, Image } from 'react-native';

const LikeScreen = ({ route }) => {
  // Check if route.params exists before trying to access post
  const post = route.params?.post;

  if (!post) {
    return (
      <View>
        <Text>Error: Post not found.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Title: {post.title}</Text>
      <Text>Location: {post.location}</Text>
      {/* Display other details as needed */}
      <Image source={{ uri: post.imageUrl }} style={{ width: 200, height: 200 }} />
    </View>
  );
};

export default LikeScreen;

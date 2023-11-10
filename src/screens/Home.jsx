import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'
import TopBar from '../components/TopBar'
import Icon from 'react-native-vector-icons/FontAwesome6';

const posts = [
  {
    id: 1,
    profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkISrkY0JL9CRE8FQ_rhPPesvt8BcO_UWoSA&usqp=CAU',
    username: 'john_doe',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXd5-wG3S5ZuMMjbeFZtAVY0GaXJYx1uBzOA&usqp=CAU',
    caption: 'Lifes too short to skip dessert! 🍰🍦 #TreatYourself #SweetTooth',
  },
  {
    id: 2,
    profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNocPxX0k27kOIm5N6Fl5p2gSm5UvUphuyw&usqp=CAU',
    username: 'jane_smith',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3UCW-2VdiWpjGo0LPHn0et8AtF_QSgXAp_w&usqp=CAU',
    caption: 'Eating good, feeling great! 🥗💪 #HealthyEating #WellnessJourney',
  },
  {
    id: 3,
    profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbeTEuSqiiMhu-2Dn8jixmP6aNiwsKC1ugSg&usqp=CAU',
    username: 'jammy',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT0iffbRFwkkhldizWK3EzD7L8axKBg9HqfOkuw77tOSyRFHl7f6mTGSH2oEc46v-b-S0&usqp=CAU',
    caption: 'Savoring every bite of this delicious meal. 😋🍽️ #FoodieHeaven #NomNom',
  },
  {
    id: 4,
    profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1CgG65cc1h4xU2UQmkmFPeeM4ejrl2tFl3g&usqp=CAU',
    username: 'cally',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzduwQTkzQhCkZdVo5YHCyl3phATtR6hPE8w&usqp=CAU',
    caption: 'Yummy',
  },
  // Add more posts as needed
];

const Home = () => {

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={{flexDirection:'row'}}>
      <Image source={{uri: item.profilepicUrl}}style={styles.profilepic}/>
      <Text style={styles.username}>{item.username}</Text>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
      <Icon name="heart" size={20} color="red" style={styles.icon} />
      <Icon name="comment" size={20} color="black" style={{marginLeft:15}} />
      <Icon name="share" size={20} color="green" style={{marginLeft:15}} />
      <Icon name="bookmark" size={20} color="blue" style={{marginLeft:220}} />
    </View>
      <Text style={styles.caption}>{item.caption}</Text>
    </View>
  );

  return (
    <View>
      <TopBar/>
      <View style={{marginBottom:150}}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPost}
      />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf:'center',
    marginLeft: 10,
  },
  profilepic:{
    width:50,
    height:50,
    borderRadius:30,
    marginTop:10,
  },
  postImage: {
    marginTop:10,
    width: '60%',
    aspectRatio: 0.9,
    alignSelf:'center'
  },
  caption: {
    marginTop: 5,
  },
  // icon:{
  //   marginLeft:20,
  // },
})
import {Box,Text,Input,Heading,FlatList,HStack,ArrowForwardIcon} from 'native-base';
import { useContext,useEffect } from 'react';
import {usersContext} from '../context'
import { getUsersList } from '../actions';
import {getSearchedUsers} from '../actions'
export const Home = ({navigation})=>{
    const {state,dispatch} = useContext(usersContext);

    

    const resolve = async ()=>{
        dispatch(await getUsersList());
    }
    useEffect(()=>{
        resolve()
    },[])

    return <Box>
        <Heading style={{textAlign:'center'}}>
                Users List
        </Heading>
        
        <Input mx="3" placeholder="Search" w="75%" maxWidth="300px"  onChangeText={async(e)=>{
            console.log(e);
            if(e.length >=3) await dispatch(await getSearchedUsers(e));
            else if(e =="") {resolve();}

            }}/>
        <FlatList
        data={state.users.list||[]}
        renderItem={({item})=>{
            return (
                <Box borderBottomWidth="1" _dark={{
                    borderColor: "gray.600"
                  }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                      <HStack style={{justifyContent:'space-between'}}>  
                             <Text>
                                  {item.name}
                            </Text>
                          <ArrowForwardIcon onPress={()=>{
                              navigation.navigate('Profile',{id:item.id})
                          }}/>
                      </HStack>
                </Box>
            )
        }}
        keyExtractor={(item)=>item.id}
/>
        {/* <Text>{state.search}</Text> */}
    </Box>

}

import { View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Search = ({ searchText, handleSearch }) => {
    return (
        <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            margin: 10,
        }}
        >
        <MaterialIcons name="search" size={20} color="gray" />
        <TextInput
            placeholder="Buscar por nombre o número de Lote"
            onChangeText={handleSearch}
            value={searchText}
            style={{ flex: 1, paddingLeft: 8 }}
        />
        </View>
    );
  };

export default Search

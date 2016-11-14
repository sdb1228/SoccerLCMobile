import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  spinnerContainer: {
    backgroundColor: 'rgba(0,0,0,0.01)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 30,
    fontSize: 13,
    padding: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  divisionNameText: {
    color: 'rgba(144,30,27,.9)',
    fontFamily: 'Helvetica',
    paddingBottom: 3,
    fontWeight: 'bold',
    fontSize: 15,
  },
  divisionNameContainer: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    borderColor: '#000',
  },
  teamCountText: {
    color: '#888',
    fontFamily: 'Helvetica',
    fontSize: 13,
  },
  divisionContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderColor: '#eee',
    backgroundColor: '#fff',
    borderWidth: 0.5,
  },
  divisionContentContainer: {
    paddingLeft: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
})

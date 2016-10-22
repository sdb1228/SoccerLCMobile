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
  buttonStyle: {
    marginRight: 20,
    borderColor: '#000',
  },
  teamNameText: {
    color: 'rgba(144,30,27,.9)',
    fontFamily: 'Helvetica',
    paddingBottom: 3,
    fontWeight: 'bold',
    fontSize: 15,
  },
  teamsNameContainer: {
    alignItems: 'flex-start',
    borderColor: '#000',
  },
  teamDivisionText: {
    color: '#888',
    fontFamily: 'Helvetica',
    fontSize: 13,
  },
  teamsDivisionContainer: {
  },
  teamsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderColor: '#eee',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 12,
    paddingVertical: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: 100,
  },
})

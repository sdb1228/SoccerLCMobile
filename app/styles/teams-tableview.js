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
    paddingBottom: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
  teamsNameContainer: {
    alignItems: 'flex-start',
    paddingLeft: 10,
    borderColor: '#000',
  },
  teamDivisionText: {
    color: '#aaa',
    fontFamily: 'Helvetica',
    paddingBottom: 5,
    fontSize: 13,
  },
  teamsDivisionContainer: {
    paddingLeft: 15,
  },
  teamsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderColor: '#eee',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
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

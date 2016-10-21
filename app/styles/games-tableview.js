import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.01)',
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
    borderColor: '#fff',
  },
  awayTeamCellText: {
    color: '#ffffff',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  homeTeamCellText: {
    color: '#ffffff',
    fontFamily: 'Helvetica',
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  teamsFieldContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  scoreContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  gameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.01)',
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

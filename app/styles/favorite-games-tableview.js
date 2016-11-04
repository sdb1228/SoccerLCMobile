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
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#777',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  },
  text: {
    fontSize: 20,
    color: '#777',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: '#ffffff',
    fontFamily: 'Helvetica',
    paddingBottom: 5,
  },
  fieldText: {
    color: '#ffffff',
    fontFamily: 'Helvetica',
    paddingBottom: 15,
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
    height: 100,
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

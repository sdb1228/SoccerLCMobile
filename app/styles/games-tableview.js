import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.01)',
    flex: 1,
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30,
  },
  cellText: {
    color: '#ffffff',
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

/*
  Module for dealing with achievements logic
*/

const Module = {
  player: null, // Will be set to the player instance reference

  points: 0,
  achievements: {
    firstSteps: { progress: 0, target: 10, completed: false }
  },

  updateAchievement: function(name, value, method) {
    const achievement = this.achievements[name]
    if (!achievement.completed) {
      if (method === "set") {
        achievement.progress = value
      } else if (method === "add") {
        achievement.progress += value
      }

      if (achievement.progress / achievement.target >= 1) {
        achievement.completed = true
        this.increasePoints(1)
      }
    }
  },

  increasePoints: function(value) {
    this.points += value
  },

  getProgress: function(achievement) {
    return this.achievements[achievement].progress
  },

  getTarget: function(achievement) {
    return this.achievements[achievement].target
  },

  isCompleted: function(achievement) {
    return this.achievements[achievement].completed
  }
}

export default Module

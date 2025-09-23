/*
  Modelo Freelance, freelanceId, userId, profile, title, skills, languages, hourlyRate
 */

class Freelance {
    constructor({ freelanceId, userId, profile, title, skills, languages, hourlyRate }) {
        this.freelanceId = freelanceId;
        this.userId = userId;
        this.profile = profile;
        this.title = title;
        this.skills = skills;
        this.languages = languages;
        this.hourlyRate = hourlyRate;
    }
}

module.exports = Freelance;
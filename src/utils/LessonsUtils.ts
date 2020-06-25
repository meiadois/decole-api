import { Lesson } from '../models/Lesson'
import { LessonRequirement } from '../models/LessonRequirement'
import { DoneLesson } from '../models/DoneLesson'

class LessonsUtils {
  async isLocked (lesson: Lesson, user_id: number): Promise<boolean> {
    const required_lessons = lesson.requirements as LessonRequirement[]
    let locked = false

    for (let i = 0; i < required_lessons.length; i++) {
      const n = await DoneLesson.count({ where: { user_id, lesson_id: required_lessons[i].id as number } })
      if (n <= 0) {
        locked = true
        break
      }
    }

    return locked
  }
}

export default new LessonsUtils()

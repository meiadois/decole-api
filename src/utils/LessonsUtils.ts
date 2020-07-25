import { Lesson } from '@models/Lesson'
import { DoneLesson } from '@models/DoneLesson'

class LessonsUtils {
  async isLocked (lesson: Lesson, user_id: number): Promise<boolean> {
    let locked = false
    const { requirements } = lesson

    for (let i = 0; i < requirements.length; i++) {
      const n = await DoneLesson.count({ where: { user_id, lesson_id: requirements[i].required_lesson_id } })
      if (n <= 0) {
        locked = true
        break
      }
    }
    return locked
  }
}

export default new LessonsUtils()

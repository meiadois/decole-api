import { Lesson } from '@models/Lesson'
import { DoneLesson } from '@models/DoneLesson'

interface LessonsInfos {
  lessons: Lesson[];
  n_done_lessons: number;
}
class LessonsUtils {
  async verify (lessons: Lesson[], user_id: number): Promise<LessonsInfos> {
    let n_done_lessons = 0

    for (let i = 0; i < lessons.length; i++) {
      const isDone = await this.isDone(lessons[i], user_id)
      lessons[i].done = isDone

      if (isDone) {
        n_done_lessons++
        lessons[i].locked = false
      } else {
        lessons[i].locked = await this.isLocked(lessons[i], user_id)
      }
    }

    return { lessons, n_done_lessons }
  }

  async isDone (lesson: Lesson, user_id: number): Promise<boolean> {
    const n = await DoneLesson.count({ where: { user_id, lesson_id: lesson.id as number } })
    return n !== 0
  }

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

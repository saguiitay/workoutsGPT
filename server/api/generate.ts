/* 
 * API REFERENCE:
 * https://platform.openai.com/docs/api-reference/chat
 */

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { muscleGroups, length, location, workoutType } = body

    let prompt = `Create a ${location} workout that goes for ${length} minutes and works out the following muscle groups: ${muscleGroups}.`

  	const reqBody = JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            "content": `You are a helpful assistant that creates gym workouts. You specialize in ${workoutType} workout plans. You will only respond with the workout plan, reps, sets and weight, no additional notes or explanations. Don't increase more than 2kg in each exercise from the previous workout.`
            //+ `\nFormat each section as follows: \n\nSection:\n| Exercise       | Sets | Reps | Weight      |\n|----------------|------|------|-------------|\n|   |     |     |   |\n|   |     |    |   |\n`
            //+ `\n## Exercises to avoid\n\n* Pull-ups\n* Push-ups\n`
            //+ `\n## Previous workout\n\nSection: Back\n\n| Exercise       | Sets | Reps | Weight      |\n|----------------|------|------|-------------|\n| Deadlift       | 3    | 8    | 160kg       |\n| Pull-ups       | 3    | 10   | body weight |\n| Bent-over Rows | 3    | 10   | 30kg        |\n\nSection: Legs\n\n| Exercise       | Sets | Reps | Weight      |\n|----------------|------|------|-------------|\n| Squats         | 4    | 6    | 130kg       |\n| Leg Press      | 3    | 10   | 200kg       |\n| Lunges         | 3    | 10   | 40kg        |\n\nSection: Chest\n\n| Exercise       | Sets | Reps | Weight      |\n|----------------|------|------|-------------|\n| Bench Press    | 4    | 6    | 100kg       |\n| Dumbbell Flyes | 3    | 10   | 60kg        |\n| Push-ups       | 3    | 10   | body weight |`
          },
          { role: 'user', content: prompt },
        ],
        temperature: 1,
        max_tokens: 3583,
        top_p: 1,
        frequency_penalty: 0,
        const presence_penalty: 0,
        n: 1,
      });
	
    // send to openai
    const request = $fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
	    body: reqBody})

	  const result = (await request) as any
    
    // set the workout text (remove leading new lines)
    let workout = result?.choices?.[0]?.message?.content
    if (workout.substring(0, 2) === '\n\n') {
      workout = workout.substring(2)
    }

    // log some stuff
    console.log(`[Prompt] ${prompt}`)
    console.log(`[Tokens] ${result?.usage?.total_tokens} (prompt: ${result?.usage?.prompt_tokens}, completion: ${result?.usage?.completion_tokens})`)
    console.log(`[Workout] ${workout}`)

    // return to browser
    return workout
  } catch (e) {
    console.log(e)
	}

  // return an error
  return ''
})

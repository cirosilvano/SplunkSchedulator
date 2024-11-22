# Splunk Schedulator
Splunk Schedulator is a user-friendly Chrome extension designed for helping splunkers perform menial, boring management tasks, much faster.
Tired of gatling-clicking around the UI to do something an automated script could do for you? Don't have time to write your own? You're in the right place.
This extension slightly modifies Splunk's Saved Searches UI to introduce features that give you a lot more control on the artifacts.

## 1. Functionalities
The current state of the extension is pre-pre-pre-alpha (feel free to add to it!), however it is still bundled with a couple powerful tools that will make your life a lot easier, especially when managing tens (or hundreds) of scheduled searches.

### 1.1 Schedule all selected searches with a single cron expression
The extension will inject a new column in the saved searches table to allow for multiple selection of various artifacts. If you need to schedule many searches at one specific time, simply select those searches by turning their checkbox on, and then go to `"Schedulator 🚀" > "Schedule selected" > Enter the cron expression > Confirm`.

### 1.2 Deschedule all the selected searches
Same as above, but will deschedule all the selected searches. `"Schedulator 🚀" > "Deschedule selected" > Confirm`.

### 1.3 CSV import/export
My own personal favorite, and probably the most useful and powerful feature. Splunk Schedulator allows you to modify the scheduling of multiple searches by mass-importing the configuration in CSV format.
The format (keep the list **headerless**) is as follows:

| App | Saved search | Cron Expression |
|----|-------------|--------------------|
| search | my daily search | 0 0 * * * |
| myapp | search_every_hour_PROD | 0 6-22 * * * |

This is extremely useful when you need to manage searches scheduled in a cascading fashion, which depend on each other's result (either via summary index, or loadjobs, or lookups). 
By exporting the configuration you can document the flow in its entirety, and make changes accordingly when needed - syncing them to production in a matter of a couple clicks.

You can import a configuration with `"Schedulator 🚀" > "Mass import CSV" > Paste the CSV configuration > Confirm`. Then, you can easily export all the selected searches to CSV with `"Schedulator 🚀" > "Export Selected to CSV"`.

### 1.4 Move all selected searches to an app
Simply move all the selected saved searches to the app of your choice. `"Schedulator 🚀" > "Move selected to app" > Type in the app > Confirm`.

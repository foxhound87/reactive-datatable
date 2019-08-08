# Service API

| Name | Type | Item | Collection | Model | Description |
|---|---|---|---|---|---|
| **load**    		| function | YES | YES | YES | Special method to load initial data. Handle MST models creations and pagination. |
| **isEmpty**    	| computed | YES | YES | NO | Check if an Item or a Collection data is Empty |
| **pagination**	| computed | NO | YES | YES | Pagination data: current, total, limit, pages. |
| **toggleView**	| function | NO | YES | YES | Make a View visible for an Item or Collection. |
| **delete**    	| function | YES | YES | YES | Deletes an Item from Collection. |
| **save**    		| function | YES | NO | NO | Create or Patch a new Item if not Empty. |
| **filter**    	| function | NO | YES | YES | Filter a collection. |
| **selected** 	| function | YES | NO | YES | Flag/Unflag an Item from Collection as Selected. |
| **unselect** 	| function | NO | YES | YES | Flag all Items of a Collection as NOT Selected. |
| **sort**    		| function | NO | YES | YES | Sort a collection. |
| **print**    	| computed | YES | YES | YES | Printable Model Data. |
| **assign**    	| function | YES | YES | YES | Assign Data to Model. |
| **snapshot**		| function | YES | YES | YES | Model Snapshot. |
| **log**			| function | YES | YES | YES | Console Log of Snapshot or Model. |
| **getRelated**	| function | YES | NO | YES | Load `hasOne` relation. |
| **findRelated**	| function | YES | NO | YES | Load `blongsTo` relation. |

### Service Feathers Calls Methods
| Name | Type | Item | Collection | Model | Description |
|---|---|---|---|---|---|
| **on**    		| function | YES | YES | YES | Feathers Event Emitters. |
| **find**   		| function | YES | YES | YES | Feathers Find method. |
| **get**    		| function | YES | YES | YES | Feathers Get method. |
| **create**    	| function | YES | YES | YES | Feathers Create method. |
| **update**    	| function | YES | YES | YES | Feathers Update method. |
| **patch**    	| function | YES | YES | YES | Feathers Patch method. |
| **remove**    	| function | YES | YES | YES | Feathers Remove method. |
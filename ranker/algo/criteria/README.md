# Ranking Algorithm

This is the main module for assigning scores based on each criteria. The criteria include:
```
- Academic Criteria
- Domain Criteria
- Job Switch Criteria
- Keyword Criteria
- Organization Criteria
- Skill Match Criteria
```

## Initialization
```python
from algo.criteria import AcademicRankCriteria, DomainRankCriteria, JobSwitchRankCriteria, KeywordMatchingCriteria, OrganizationRankCriteria, SkillsRankCriteria

# Initializing objects of each criteria classes
ac = AcademicRankCriteria()
dc = DomainRankCriteria()
jsc = JobSwitchRankCriteria()
kc = KeywordMatchingCriteria()
oc = OrganizationRankCriteria()
sc = SkillsRankCriteria()

# Calling the rank() function to get scores for each criterion
ac_rank = ac.rank(<institutes>, degree=<degrees>)
dc_rank = dc.rank(<experience>, <jd>)
jsc_rank = jsc.rank(<companies>)
kc_rank = kc.rank(<cv>, <keywords>)
oc_rank = oc.rank(<companies>)
sc_rank = sc.rank(<skills>, <jdskills>)
```

const preferencesCategories = [
    {
        key: 'Jacksoxn',
        id: 0,
        image: require("../../assets/images/preferences/mbbs.jpg"),
        fadedImage:require("../../assets/images/preferences/mbbs-fade.jpg"),
        faculty:'MBBS',
        fullName:"Bachelor of Medicine and a Bachelor of Surgery",
        subjects:[
            {
                id:0,
                subjectName:'Basic Science'
            },
            {
                id:1,
                subjectName:'Clinical Science'
            }
        ]    
    },
    {
        key: 'Dominic',
        id: 1,
        image: require("../../assets/images/preferences/bds.jpg"),
        fadedImage:require("../../assets/images/preferences/bds-fade.jpg"),
        faculty:'BDS',
        fullName:'Bachelor of Dental Surgery',
        subjects:[
            {
                id:0,
                subjectName:'Basic Science'
            },
            {
                id:1,
                subjectName:'Clinical Science'
            },
            {
                id:2,
                subjectName:'Dental'
            }
        ]    
    },
    {
        key: 'James',
        id: 2,
        image: require("../../assets/images/preferences/nursing.jpg"),
        fadedImage:require("../../assets/images/preferences/nursing-fade.jpg"),
        faculty:'Nursing',
        fullName:'Nursing',
        subjects:[
            {
                id:0,
                subjectName:'Basic Science'
            },
            {
                id:1,
                subjectName:'Nursing'
            }
        ]    
    },
    {
        key: 'Devin',
        id: 3,
        image: require("../../assets/images/preferences/bams.png"),
        fadedImage:require("../../assets/images/preferences/bams-fade.png"),
        faculty:'BAMS',
        fullName:'Bachelor of Ayurveda, Medicine and Surgery',
        subjects:[
            {
                id:0,
                subjectName:'Basic Science'
            },
            {
                id:1,
                subjectName:'Clinical Science'
            }
        ]    
    },
    {
        key: 'Jack',
        id: 3,
        image: require("../../assets/images/preferences/physio.jpg"),
        fadedImage:require("../../assets/images/preferences/physio-fade.jpg"),
        faculty:'Physiotherapy',
        fullName:'Physiotherapy',
        subjects:[
            {
                id:0,
                subjectName:'Basic Science'
            },
            // {
            //     id:1,
            //     subjectName:'Physiotherapy'
            // }
        ]    
    },
]

export { preferencesCategories }

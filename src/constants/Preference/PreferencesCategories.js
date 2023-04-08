const preferencesCategories = [
    {
        key: 'Jacksoxn',
        id: 0,
        image: require("../../assets/images/preferences/mbbs.webp"),
        fadedImage:require("../../assets/images/preferences/mbbs-fade.webp"),
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
        image: require("../../assets/images/preferences/bds.webp"),
        fadedImage:require("../../assets/images/preferences/bds-fade.webp"),
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
        image: require("../../assets/images/preferences/nursing.webp"),
        fadedImage:require("../../assets/images/preferences/nursing-fade.webp"),
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
        image: require("../../assets/images/preferences/bams.webp"),
        fadedImage:require("../../assets/images/preferences/bams-fade.webp"),
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
        image: require("../../assets/images/preferences/physio.webp"),
        fadedImage:require("../../assets/images/preferences/physio-fade.webp"),
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

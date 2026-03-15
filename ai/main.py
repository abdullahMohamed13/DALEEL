# app.py
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import re
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# ===============================
# Language Detection
# ===============================
def detect_language(text: str) -> str:
    """
    Detect language from text (Arabic or English)
    Returns: "AR" for Arabic, "EN" for English
    """
    if re.search(r"[أ-ي]", text):
        return "AR"
    return "EN"

# ===============================
# Dataset
# ===============================
RAW_DATASET = [
    # ================== الأحوال المدنية ==================
    {
        "category": "الأحوال المدنية",
        "service": "استخراج بطاقة رقم قومي",
        "queries": ["عايز استخرج بطاقة", "استخراج بطاقة جديدة", "بطاقة رقم قومي جديد"],
        "steps": [
            "تجهيز شهادة الميلاد أو القيد العائلي.",
            "زيارة مكتب الأحوال المدنية أو الموقع الرسمي.",
            "تعبئة طلب استخراج البطاقة.",
            "دفع الرسوم المطلوبة.",
            "استلام البطاقة في الموعد المحدد."
        ],
        "documents": ["شهادة ميلاد أو قيد عائلي", "صور شخصية حديثة", "إيصال دفع الرسوم"]
    },
    {
        "category": "الأحوال المدنية",
        "service": "تجديد بطاقة رقم قومي",
        "queries": ["عايز أجدد البطاقة", "تجديد بطاقة", "بطاقة رقم قومي تجديد"],
        "steps": [
            "تقديم البطاقة القديمة في مكتب الأحوال المدنية.",
            "تعبئة نموذج طلب التجديد.",
            "دفع رسوم التجديد.",
            "استلام البطاقة الجديدة."
        ],
        "documents": ["البطاقة القديمة", "صور شخصية حديثة", "إيصال دفع الرسوم"]
    },
    {
        "category": "الأحوال المدنية",
        "service": "بدل فاقد / تالف بطاقة رقم قومي",
        "queries": ["ضاعت بطاقتي", "بدل فاقد بطاقة", "بطاقة رقم قومي تالفة"],
        "steps": [
            "تقديم بلاغ فقدان أو تلف البطاقة.",
            "تعبئة طلب إصدار البطاقة الجديدة.",
            "دفع الرسوم المطلوبة.",
            "استلام البطاقة الجديدة."
        ],
        "documents": ["صورة البطاقة القديمة إذا موجودة", "شهادة ميلاد أو قيد عائلي", "إيصال دفع الرسوم"]
    },
    {
        "category": "الأحوال المدنية",
        "service": "شهادة ميلاد",
        "queries": ["عايز شهادة ميلاد", "استخراج شهادة ميلاد"],
        "steps": [
            "ملء طلب استخراج شهادة ميلاد.",
            "تقديم المستندات المطلوبة (قيد الأسرة).",
            "دفع الرسوم المطلوبة.",
            "استلام الشهادة من مكتب الأحوال المدنية."
        ],
        "documents": ["قيد الأسرة", "بطاقة الرقم القومي للأبوين"]
    },
    {
        "category": "الأحوال المدنية",
        "service": "شهادة وفاة",
        "queries": ["عايز شهادة وفاة", "استخراج شهادة وفاة"],
        "steps": [
            "تقديم شهادة الوفاة من المستشفى أو الجهة المختصة.",
            "تعبئة طلب استخراج الشهادة.",
            "دفع الرسوم.",
            "استلام الشهادة."
        ],
        "documents": ["شهادة الوفاة", "بطاقة الرقم القومي للمتوفى", "إثبات صلة القرابة"]
    },
    {
        "category": "الأحوال المدنية",
        "service": "قيد فردي",
        "queries": ["عايز قيد فردي", "استخراج قيد فردي"],
        "steps": [
            "زيارة مكتب الأحوال المدنية.",
            "تقديم المستندات المطلوبة.",
            "تعبئة طلب استخراج القيد.",
            "استلام القيد."
        ],
        "documents": ["بطاقة الرقم القومي", "مستندات تثبت البيانات الشخصية"]
    },
    {
        "category": "الأحوال المدنية",
        "service": "قيد عائلي",
        "queries": ["عايز قيد عائلي", "استخراج قيد عائلي"],
        "steps": [
            "تقديم مستندات الأسرة كاملة.",
            "تعبئة طلب استخراج القيد العائلي.",
            "دفع الرسوم المطلوبة.",
            "استلام القيد."
        ],
        "documents": ["شهادات الميلاد لجميع أفراد الأسرة", "بطاقة الرقم القومي للوالدين"]
    },
    {
        "category": "الأحوال المدنية",
        "service": "تعديل بيانات البطاقة",
        "queries": ["عايز أعدل بياناتي", "تحديث البيانات في البطاقة"],
        "steps": [
            "تقديم طلب تعديل البيانات.",
            "تقديم المستندات اللازمة (مثل شهادات تثبت التغيير).",
            "دفع الرسوم إذا كانت مطلوبة.",
            "استلام البطاقة بعد تعديل البيانات."
        ],
        "documents": ["المستندات التي تثبت التغيير (مثل عقد زواج، شهادة ميلاد جديدة)", "بطاقة الرقم القومي الحالية"]
    },
    # ================== المرور ==================
    {
        "category": "المرور",
        "service": "رخصة قيادة جديدة",
        "queries": ["عايز رخصة قيادة", "رخصة قيادة جديدة", "استخراج رخصة"],
        "steps": [
            "التسجيل في مدرسة تعليم القيادة واجتياز التدريب النظري والعملي.",
            "تقديم الطلب في وحدة المرور.",
            "تقديم المستندات المطلوبة (بطاقة رقم قومي، صور، كشف طبي).",
            "دفع الرسوم.",
            "اجتياز اختبار القيادة واستلام الرخصة."
        ],
        "documents": ["بطاقة الرقم القومي", "صور شخصية حديثة", "كشف طبي", "إيصال دفع الرسوم"]
    },
    {
        "category": "المرور",
        "service": "تجديد رخصة قيادة",
        "queries": ["عايز أجدد رخصة القيادة", "تجديد رخصة قيادة"],
        "steps": [
            "تقديم الرخصة القديمة في وحدة المرور.",
            "تعبئة نموذج طلب التجديد.",
            "دفع رسوم التجديد.",
            "استلام الرخصة الجديدة."
        ],
        "documents": ["الرخصة القديمة", "بطاقة الرقم القومي", "إيصال دفع الرسوم"]
    },
    {
        "category": "المرور",
        "service": "بدل فاقد / تالف رخصة قيادة",
        "queries": ["ضاعت رخصتي", "بدل فاقد رخصة قيادة"],
        "steps": [
            "تقديم بلاغ فقدان أو تلف الرخصة.",
            "تقديم طلب إصدار بدل فاقد.",
            "دفع الرسوم المطلوبة.",
            "استلام الرخصة الجديدة."
        ],
        "documents": ["صورة الرخصة القديمة إذا موجودة", "بطاقة الرقم القومي", "إيصال دفع الرسوم"]
    },
    {
        "category": "المرور",
        "service": "رخصة قيادة دولية",
        "queries": ["عايز رخصة دولية", "استخراج رخصة دولية"],
        "steps": [
            "تقديم طلب الرخصة الدولية مع الرخصة المحلية.",
            "دفع الرسوم.",
            "استلام الرخصة الدولية."
        ],
        "documents": ["الرخصة المحلية", "بطاقة الرقم القومي", "صور شخصية"]
    },
    {
        "category": "المرور",
        "service": "الاستعلام عن مخالفات المرور",
        "queries": ["عايز أعرف مخالفاتي", "استعلام مخالفات مرور"],
        "steps": [
            "الدخول على الموقع الرسمي للمرور أو وحدة المرور.",
            "إدخال رقم اللوحة أو رقم الرخصة.",
            "عرض المخالفات وقيمتها."
        ],
        "documents": ["رقم اللوحة", "رقم رخصة القيادة"]
    },
    {
        "category": "المرور",
        "service": "سداد مخالفات المرور",
        "queries": ["عايز أسدد المخالفات", "دفع مخالفات المرور"],
        "steps": [
            "الاستعلام عن المخالفات.",
            "اختيار المخالفة المراد دفعها.",
            "دفع الرسوم إلكترونيًا أو في وحدة المرور.",
            "الحصول على إيصال الدفع."
        ],
        "documents": ["رقم اللوحة", "رقم رخصة القيادة", "وسيلة دفع"]
    },
    # ================== التعليم ==================
    {
        "category": "التعليم",
        "service": "التقديم للمدارس الحكومية",
        "queries": ["عايز أسجل في مدرسة", "تسجيل مدرسة حكومية"],
        "steps": [
            "زيارة المدرسة أو الموقع الرسمي للتقديم.",
            "تعبئة طلب التسجيل.",
            "تقديم المستندات المطلوبة.",
            "دفع الرسوم إذا كانت مطلوبة.",
            "تأكيد قبول الطلب واستلام بطاقة الطالب."
        ],
        "documents": ["شهادة الميلاد", "بطاقة الرقم القومي للوالدين", "صور شخصية", "إيصال دفع الرسوم"]
    },
    {
        "category": "التعليم",
        "service": "تحويل الطلاب بين المدارس",
        "queries": ["عايز أحول ابني", "تحويل الطلاب"],
        "steps": [
            "تقديم طلب تحويل المدرسة الحالية للمدرسة الجديدة.",
            "تقديم شهادات الطالب السابقة.",
            "موافقة المدرسة الجديدة والجهات المختصة.",
            "استلام بطاقة الطالب الجديدة."
        ],
        "documents": ["شهادة الطالب السابقة", "بطاقة الرقم القومي للوالدين", "نموذج طلب التحويل"]
    },
    {
        "category": "التعليم",
        "service": "استخراج بيان نجاح",
        "queries": ["عايز بيان نجاح", "استخراج بيان نجاح"],
        "steps": [
            "تقديم طلب استخراج البيان في المدرسة أو الإدارة التعليمية.",
            "دفع الرسوم المطلوبة.",
            "استلام البيان بعد المعالجة."
        ],
        "documents": ["بطاقة الطالب", "إيصال دفع الرسوم"]
    },
    {
        "category": "التعليم",
        "service": "تسجيل الطلاب في الجامعات",
        "queries": ["عايز أسجل في جامعة", "تسجيل في جامعة"],
        "steps": [
            "تعبئة نموذج التقديم الإلكتروني أو الورقي.",
            "تقديم المستندات المطلوبة (شهادة الثانوية، بطاقة الرقم القومي).",
            "دفع رسوم التسجيل.",
            "استلام رقم الطالب والبطاقة الجامعية."
        ],
        "documents": ["شهادة الثانوية", "بطاقة الرقم القومي", "إيصال دفع الرسوم"]
    },
    # ================== التموين ==================
    {
        "category": "التموين",
        "service": "استخراج بطاقة تموين جديدة",
        "queries": ["عايز بطاقة تموين", "استخراج تموين جديد"],
        "steps": [
            "تعبئة نموذج طلب البطاقة.",
            "تقديم المستندات المطلوبة (بطاقة رقم قومي، شهادات ميلاد أفراد الأسرة).",
            "دفع الرسوم إذا كانت مطلوبة.",
            "استلام البطاقة من مكتب التموين."
        ],
        "documents": ["بطاقة الرقم القومي للمتقدم", "شهادات ميلاد أفراد الأسرة", "إيصال دفع الرسوم"]
    },
    {
        "category": "التموين",
        "service": "تحديث بيانات بطاقة التموين",
        "queries": ["عايز أضيف شخص في التموين", "تحديث بيانات التموين"],
        "steps": [
            "زيارة مكتب التموين أو الموقع الرسمي.",
            "تعبئة نموذج تعديل البيانات.",
            "تقديم المستندات المطلوبة.",
            "تأكيد التحديث واستلام البطاقة المحدثة."
        ],
        "documents": ["بطاقة التموين الحالية", "بطاقات الرقم القومي للأفراد الجدد أو المحذوفين", "شهادات ميلاد إذا لزم"]
    },
    {
        "category": "التموين",
        "service": "بدل فاقد للتموين",
        "queries": ["ضاعت بطاقة التموين", "طلب بدل فاقد تموين"],
        "steps": [
            "تقديم طلب بدل فاقد.",
            "تقديم المستندات المطلوبة.",
            "دفع الرسوم.",
            "استلام البطاقة الجديدة."
        ],
        "documents": ["بطاقة الرقم القومي", "إيصال رسوم", "نموذج طلب بدل فاقد"]
    },
    {
        "category": "التموين",
        "service": "نقل بطاقة تموين بين المحافظات",
        "queries": ["عايز أنقل بطاقتي", "نقل التموين لمحافظة أخرى"],
        "steps": [
            "تقديم طلب النقل في مكتب التموين.",
            "تقديم المستندات المطلوبة.",
            "دفع الرسوم إذا لزم.",
            "استلام البطاقة الجديدة في المحافظة الجديدة."
        ],
        "documents": ["بطاقة التموين الحالية", "بطاقة الرقم القومي", "إثبات محل السكن الجديد"]
    },

    # ================== الصحة ==================
    {
        "category": "الصحة",
        "service": "التسجيل في التأمين الصحي",
        "queries": ["عايز سجل في التأمين الصحي", "تسجيل تأمين صحي"],
        "steps": [
            "زيارة مكتب التأمين الصحي أو الموقع الرسمي.",
            "تعبئة نموذج التسجيل.",
            "تقديم المستندات المطلوبة.",
            "دفع الرسوم إذا لزم.",
            "استلام بطاقة التأمين الصحي."
        ],
        "documents": ["بطاقة الرقم القومي", "إيصال رسوم التسجيل", "صور شخصية"]
    },
    {
        "category": "الصحة",
        "service": "حجز كشف بالمستشفى الحكومي",
        "queries": ["عايز أحجز كشف", "حجز كشف مستشفى"],
        "steps": [
            "اختيار المستشفى والعيادة المناسبة.",
            "تحديد موعد الكشف على الموقع أو المكتب.",
            "دفع الرسوم إذا لزم.",
            "تأكيد الحجز واستلام الإيصال."
        ],
        "documents": ["بطاقة الرقم القومي", "أي مستند طبي سابق إذا موجود"]
    },
    {
        "category": "الصحة",
        "service": "طلب علاج على نفقة الدولة",
        "queries": ["عايز علاج على نفقة الدولة", "علاج على نفقة الدولة"],
        "steps": [
            "تقديم طلب رسمي في مكتب الخدمات الصحية أو المستشفى.",
            "تقديم المستندات المطلوبة التي تثبت الحالة الصحية والمالية.",
            "مراجعة الطلب من الجهة المختصة.",
            "الموافقة على العلاج وتنفيذ العلاج بالمستشفى."
        ],
        "documents": ["بطاقة الرقم القومي", "تقرير طبي يثبت الحالة", "أي مستند يثبت الحالة المالية"]
    },
    {
        "category": "الصحة",
        "service": "إصدار شهادة طبية",
        "queries": ["عايز شهادة طبية", "استخراج شهادة طبية"],
        "steps": [
            "تقديم طلب استخراج الشهادة في المستشفى أو العيادة.",
            "تقديم المستندات المطلوبة.",
            "دفع الرسوم إذا لزم.",
            "استلام الشهادة الطبية."
        ],
        "documents": ["بطاقة الرقم القومي", "تقرير طبي أو مستندات داعمة"]
    },

    # ================== الجوازات والهجرة ==================
    {
        "category": "الجوازات والهجرة",
        "service": "استخراج جواز سفر",
        "queries": ["عايز أطلع جواز سفر", "جواز سفر جديد"],
        "steps": [
            "زيارة مكتب الجوازات أو الموقع الرسمي.",
            "تعبئة طلب استخراج الجواز.",
            "تقديم المستندات المطلوبة.",
            "دفع الرسوم.",
            "استلام الجواز في الموعد المحدد."
        ],
        "documents": ["بطاقة الرقم القومي", "صور شخصية حديثة", "إيصال دفع الرسوم"]
    },
    {
        "category": "الجوازات والهجرة",
        "service": "تجديد جواز سفر",
        "queries": ["عايز أجدد جواز السفر", "تجديد جواز سفر"],
        "steps": [
            "تقديم الجواز القديم.",
            "تعبئة طلب التجديد.",
            "دفع الرسوم المطلوبة.",
            "استلام الجواز الجديد."
        ],
        "documents": ["الجواز القديم", "بطاقة الرقم القومي", "صور شخصية", "إيصال دفع الرسوم"]
    },
    {
        "category": "الجوازات والهجرة",
        "service": "بدل فاقد جواز سفر",
        "queries": ["ضاع جوازي", "بدل فاقد جواز"],
        "steps": [
            "تقديم بلاغ فقدان الجواز.",
            "تعبئة نموذج طلب إصدار بدل فاقد.",
            "دفع الرسوم.",
            "استلام الجواز الجديد."
        ],
        "documents": ["صورة الجواز القديم إذا موجود", "بطاقة الرقم القومي", "إيصال دفع الرسوم"]
    },
    {
        "category": "الجوازات والهجرة",
        "service": "تصاريح الإقامة لغير المصريين",
        "queries": ["عايز تصريح إقامة", "إقامة لغير المصريين"],
        "steps": [
            "تقديم طلب تصريح الإقامة في مكتب الجوازات.",
            "تقديم المستندات المطلوبة (جواز السفر، صور شخصية).",
            "دفع الرسوم.",
            "استلام تصريح الإقامة."
        ],
        "documents": ["جواز السفر ساري", "صور شخصية", "إيصال دفع الرسوم"]
    },

    # ================== الشهر العقاري ==================
    {
        "category": "الشهر العقاري",
        "service": "توثيق عقد",
        "queries": ["عايز أوثق عقد", "توثيق عقد"],
        "steps": [
            "تقديم العقد الأصلي للمكتب.",
            "ملء طلب التوثيق.",
            "دفع الرسوم.",
            "استلام النسخة الموثقة."
        ],
        "documents": ["العقد الأصلي", "بطاقة الرقم القومي", "إيصال دفع الرسوم"]
    },
    {
        "category": "الشهر العقاري",
        "service": "تسجيل عقار",
        "queries": ["عايز أسجل عقار", "تسجيل عقار"],
        "steps": [
            "تقديم مستندات الملكية للمكتب.",
            "تعبئة طلب التسجيل.",
            "دفع الرسوم.",
            "استلام إيصال التسجيل وشهادة الملكية."
        ],
        "documents": ["سند الملكية", "بطاقة الرقم القومي", "إيصالات دفع الضرائب العقارية"]
    },

    # ================== الكهرباء / المياه / الغاز ==================
    {
        "category": "الخدمات العامة",
        "service": "توصيل كهرباء جديد",
        "queries": ["عايز كهرباء جديدة", "توصيل كهرباء"],
        "steps": [
            "تقديم طلب توصيل كهرباء في الشركة المزودة.",
            "تحديد موقع التوصيل.",
            "دفع الرسوم والمصاريف.",
            "استلام إيصال التوصيل."
        ],
        "documents": ["بطاقة الرقم القومي", "صورة الملكية أو عقد الإيجار", "إيصال دفع الرسوم"]
    },
    {
        "category": "الخدمات العامة",
        "service": "توصيل مياه / غاز",
        "queries": ["عايز مياه جديدة", "توصيل غاز"],
        "steps": [
            "تقديم الطلب في الشركة المزودة.",
            "تحديد موقع التوصيل.",
            "دفع الرسوم.",
            "استلام إيصال التوصيل."
        ],
        "documents": ["بطاقة الرقم القومي", "صورة الملكية أو عقد الإيجار", "إيصال دفع الرسوم"]
    },

    # ================== الضرائب ==================
    {
        "category": "الضرائب",
        "service": "التسجيل في مصلحة الضرائب",
        "queries": ["عايز أسجل في الضرائب", "تسجيل ضريبة"],
        "steps": [
            "تقديم طلب التسجيل في مكتب الضرائب أو الموقع الرسمي.",
            "تقديم المستندات المطلوبة.",
            "الحصول على رقم التسجيل الضريبي.",
            "استلام إيصال التسجيل."
        ],
        "documents": ["بطاقة الرقم القومي", "سند ملكية أو عقد إيجار", "مستندات النشاط التجاري"]
    },
    {
        "category": "الضرائب",
        "service": "دفع الضرائب السنوية",
        "queries": ["عايز أدفع الضريبة", "دفع الضريبة السنوية"],
        "steps": [
            "استلام إخطار الضريبة.",
            "تقديم الإقرار الضريبي إذا لزم.",
            "دفع الرسوم إلكترونيًا أو في مكتب الضرائب.",
            "الحصول على إيصال الدفع."
        ],
        "documents": ["رقم التسجيل الضريبي", "إيصال دفع الضريبة"]
    }
]

# ===============================
# Prepare embeddings and FAISS index
# ===============================
model = SentenceTransformer("all-MiniLM-L6-v2")

# Build FAISS Index
texts = []
for item in RAW_DATASET:
    for q in item["queries"]:
        texts.append(q)

EMBEDDINGS = model.encode(texts, convert_to_numpy=True)
dim = EMBEDDINGS.shape[1]

index = faiss.IndexFlatIP(dim)
faiss.normalize_L2(EMBEDDINGS)
index.add(EMBEDDINGS)
ALL_QUERIES = texts

# ===============================
# RAG Retrieval
# ===============================

# ===============================
# FastAPI App
# ===============================
app = FastAPI(
    title="Daleel – AI Government Service Guide",
    description="AI-powered government services guide for Egypt",
    version="1.0.0"
)

# Allow CORS for mobile apps and web frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# ===============================
# Startup Event
# ===============================
@app.on_event("startup")
async def startup_event():
    """Log API information on startup"""
    print("\n" + "="*60)
    print("🚀 Daleel – AI Government Service Guide")
    print("="*60)
    print("\n📍 API Endpoints:")
    print("   • Base URL:           http://localhost:8000")
    print("   • Swagger Docs:       http://localhost:8000/docs ✨")
    print("   • ReDoc:              http://localhost:8000/redoc")
    print("\n📝 Example Requests:")
    print("   • Arabic:  http://localhost:8000/service?query=عايز استخرج بطاقة")
    print("   • English: http://localhost:8000/service?query=I want a new ID")
    print("\n✅ Server is running and ready to use!")
    print("="*60 + "\n")

# ===============================
# Pydantic Models
# ===============================
class ServiceResponse(BaseModel):
    service: str
    category: str
    steps: List[str]
    documents: List[str]
    confidence: float
    language: str

class ServiceListResponse(BaseModel):
    services: List[str]
    categories: List[str]

class HealthResponse(BaseModel):
    status: str
    model: str
    model_loaded: bool

# ===============================
# Helper Functions
# ===============================
def retrieve_service(user_query: str):
    """
    Retrieve service information based on user query using semantic search
    """
    query_embedding = model.encode([user_query], convert_to_numpy=True)
    faiss.normalize_L2(query_embedding)

    scores, indices = index.search(query_embedding, 1)
    score = float(scores[0][0])

    # Confidence threshold
    if score < 0.55:
        return None, score

    matched_query = ALL_QUERIES[indices[0][0]]

    # Find the corresponding service in dataset
    for item in RAW_DATASET:
        if matched_query in item["queries"]:
            return item, score

    return None, score

def get_all_services() -> List[str]:
    """Get all available services"""
    return list(set([item["service"] for item in RAW_DATASET]))

def get_all_categories() -> List[str]:
    """Get all available categories"""
    return list(set([item["category"] for item in RAW_DATASET]))

# ===============================
# API Endpoints
# ===============================

@app.get("/health", response_model=HealthResponse)
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model": "all-MiniLM-L6-v2",
        "model_loaded": model is not None
    }

@app.post("/service", response_model=Optional[ServiceResponse])
def get_service(query: str = Query(..., description="User request in Arabic or English")):
    """
    Get government service information based on user query
    
    Args:
        query: User request/question
    
    Returns:
        ServiceResponse with service details, steps, and required documents
    """
    if not query or len(query.strip()) == 0:
        return None
    
    result, confidence = retrieve_service(query)
    language = detect_language(query)
    
    if result is None:
        return None
    
    return {
        "service": result["service"],
        "category": result["category"],
        "steps": result["steps"],
        "documents": result["documents"],
        "confidence": round(confidence, 2),
        "language": language
    }

@app.get("/service", response_model=Optional[ServiceResponse])
def get_service_get(query: str = Query(..., description="User request in Arabic or English")):
    """
    Get government service information based on user query (GET method)
    """
    if not query or len(query.strip()) == 0:
        return None
    
    result, confidence = retrieve_service(query)
    language = detect_language(query)
    
    if result is None:
        return None
    
    return {
        "service": result["service"],
        "category": result["category"],
        "steps": result["steps"],
        "documents": result["documents"],
        "confidence": round(confidence, 2),
        "language": language
    }

@app.get("/services", response_model=ServiceListResponse)
def get_services_list():
    """
    Get list of all available services and categories
    """
    return {
        "services": get_all_services(),
        "categories": get_all_categories()
    }

@app.get("/categories")
def get_categories():
    """Get all available categories"""
    return {
        "categories": get_all_categories()
    }

@app.post("/search")
def search_service(query: str = Query(..., description="Search query")):
    """
    Search for services with detailed matching
    """
    if not query or len(query.strip()) == 0:
        return {"error": "Query cannot be empty"}
    
    result, confidence = retrieve_service(query)
    language = detect_language(query)
    
    return {
        "query": query,
        "language": language,
        "found": result is not None,
        "confidence": round(confidence, 2),
        "service": result if result else None
    }

# ===============================
# Root endpoint
# ===============================
@app.get("/")
def root():
    """Root endpoint with API information"""
    return {
        "name": "Daleel – AI Government Service Guide",
        "version": "1.0.0",
        "description": "AI-powered government services guide for Egypt",
        "endpoints": {
            "health": "/health",
            "get_service": "/service?query=<your_query>",
            "search": "/search?query=<your_query>",
            "services_list": "/services",
            "categories": "/categories"
        }
    }

# ===============================
# Run with uvicorn: uvicorn main:app --reload
# ===============================
